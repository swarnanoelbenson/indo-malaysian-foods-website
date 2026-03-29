import React from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
  /** Narrows max-width to 768px — useful for text-heavy pages */
  narrow?: boolean;
  /** Expands max-width to 1400px — useful for wide gallery/grid pages */
  wide?: boolean;
  /** Extra className(s) to merge in */
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  narrow = false,
  wide   = false,
  className = '',
}) => {
  const classes = [
    'container-wrap',
    narrow ? 'container-wrap--narrow' : '',
    wide   ? 'container-wrap--wide'   : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default Container;
