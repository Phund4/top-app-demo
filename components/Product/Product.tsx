import styles from '@/styles/Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import Card from '../Card/Card';
import Rating from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import {motion} from 'framer-motion';

// eslint-disable-next-line react/display-name
const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: {
            opacity: 1, 
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    };

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>
                    {product.title}
                    <div className={styles.tag}>
                    {product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}
                    </div>
                </div>
                <div className={styles.price}>
                        {priceRu(product.price)}
                        {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
                    <div className={styles.priceTitle}>
                        ????????
                    </div>
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}/<span className={styles.month}>??????</span>
                    <div className={styles.creditTitle}>
                        ????????????
                    </div>
                </div>
                <div className={styles.rating}>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                    <div className={styles.rateTitle}>
                        <a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['??????????', '????????????', '??????????????'])}</a>
                    </div>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>
                    {product.description}
                </div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages &&
                    <div className={styles.advantages}>
                        <div className={styles.advTitle}>????????????????????????</div>
                        {product.advantages}
                    </div> }
                    { product.disadvantages &&
                    <div className={styles.disadvantages}>
                        <div className={styles.disadvTitle}>????????????????????</div>
                        {product.disadvantages}
                    </div> }
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance='primary'>???????????? ??????????????????</Button>
                    <Button 
                        appearance='ghost' 
                        arrow={isReviewOpened ? 'down': 'right'} 
                        className={styles.reviewButton}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                    >???????????? ????????????</Button>
                </div>
            </Card>
            <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
                <Card color='blue' className={styles.reviews} ref={reviewRef}>
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r}/>
                            <Divider/>
                        </div>
                    ))}
                    <ReviewForm productId={product._id}/>
                </Card>
            </motion.div>
        </div>
    );
}));

Product.displayName = 'Product';
export default Product;