import React, { useEffect, useReducer } from "react";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Advantages, Card, HhData, Htag, P, Product, Sort, Tag } from '../../components';
import styles from '../../styles/TopPageComponent.module.css';
import { TopLevelCategory } from "@/interfaces/page.interface";
import { SortEnum } from "@/components/Sort/Sort.props";
import { SortReducer } from "./sort.reducer";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispathSort] = useReducer(SortReducer, { products, sort: SortEnum.Rating });

    const SetSort = (sort: SortEnum) => {
        dispathSort({ type: sort });
    };

    useEffect(() => {
        dispathSort({type: 'reset', initialState: products});
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                { products && <Tag color='grey' size='m'>{products.length}</Tag> }
                <Sort sort={sort} setSort={SetSort}/>
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => <Product layout product={p} key={p._id}/>)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}></HhData>}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantages advantages={page.advantages}></Advantages>
            </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText}}/>}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
        </div>
    );
};