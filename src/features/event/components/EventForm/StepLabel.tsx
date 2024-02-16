type Props = {
  step: number
  className?: string
};

export const StepLabel = ({ step, className }: Props) => {
  return (
    <span className={`inline-block bg-muted-foreground text-white text-xs px-1 py-0.5 rounded-sm font-normal ${className}`}>
      {`STEP ${step}`}
    </span>
  );
};
