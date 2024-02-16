type Props = {
  className?: string
};

/**
 * Asterisk mark for the label of required fields
 *
 * @param {Props} { className }
 * @return {JSX.Element}
 */
export const RequiredLabel = ({ className }: Props) => {
  return (
    <span className={`text-orange-600 ${className}`}>*</span>
  );
};
