import styles from '@/styles/Textarea.module.css';
import { TextareaProps } from './Textarea.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

const Textarea = forwardRef(({ className, error, ...props }: TextareaProps, ref:ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(styles.textareaWrapper, className)}>
            <textarea className={cn(styles.textarea, {
                [styles.error]: error
            })} ref={ref} {...props}/>
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

Textarea.displayName = 'Textarea';
export default Textarea;