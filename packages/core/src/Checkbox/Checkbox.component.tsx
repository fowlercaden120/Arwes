/* @jsx jsx */
import {
  HTMLProps,
  MutableRefObject,
  CSSProperties,
  ReactNode,
  ReactElement,
  FormEvent,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { useBleeps } from '@arwes/bleeps';

import { generateStyles } from './Checkbox.styles';

// TODO: [PRIORITY:LOW] Add support for "indeterminate" value.
// TODO: [PRIORITY:LOW] Add support for right-to-left layout.

interface CheckboxProps {
  name?: string
  autoFocus?: boolean
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (event: FormEvent<HTMLInputElement>) => void
  inputProps?: HTMLProps<HTMLInputElement>
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLLabelElement | null> | ((node: HTMLLabelElement) => void)
  children?: ReactNode
}

const Checkbox = (props: CheckboxProps): ReactElement => {
  const {
    name,
    autoFocus,
    readOnly,
    required,
    disabled,
    defaultChecked,
    checked,
    onChange,
    inputProps,
    palette,
    className,
    style,
    rootRef,
    children
  } = props;

  const theme = useTheme();
  const bleeps = useBleeps();

  const styles = useMemo(
    () => generateStyles(theme, { disabled, readOnly, palette }),
    [theme, disabled, readOnly, palette]
  );

  const onChangeProxy = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.currentTarget.checked = !event.currentTarget.checked;
      return;
    }

    onChange?.(event);

    bleeps.toggle?.play();
  }, [readOnly, onChange]);

  return (
    <label
      className={cx('arwes-checkbox', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <div
        className='arwes-checkbox__container'
        css={styles.container}
      >
        <div
          className='arwes-checkbox__shapes'
          css={styles.shapes}
        >
          <input
            name={name}
            autoFocus={autoFocus}
            readOnly={readOnly}
            required={required}
            disabled={disabled}
            tabIndex={readOnly ? -1 : 0}
            {...inputProps}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={onChangeProxy}
            type='checkbox'
            className={cx('arwes-checkbox__input', inputProps?.className)}
            css={styles.input}
          />
          <div className='arwes-checkbox__bg' css={styles.bg} />
          <div className='arwes-checkbox__box' css={[styles.box, styles.boxLT]} />
          <div className='arwes-checkbox__box' css={[styles.box, styles.boxLB]} />
          <div className='arwes-checkbox__box' css={[styles.box, styles.boxRT]} />
          <div className='arwes-checkbox__box' css={[styles.box, styles.boxRB]} />
          <div className='arwes-checkbox__mark' css={styles.mark} />
        </div>
        {!!children && (
          <div className='arwes-checkbox__content' css={styles.content}>
            {children}
          </div>
        )}
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  inputProps: PropTypes.object,
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any,
  children: PropTypes.any
};

export { CheckboxProps, Checkbox };
