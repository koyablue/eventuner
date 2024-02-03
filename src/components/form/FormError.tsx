import { Icons } from "@/components/icnos";

type Props = {
  message?: string
  iconSize?: number
};

/**
 * Error message section for event creating form
 *
 * @param {Props} { message, iconSize }
 * @return {JSX.Element}
 */
export const FormError = ({ message = "", iconSize = 16 }: Props) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-1 text-orange-600 py-2 text-sm">
      <Icons.alertCircle size={iconSize} className="mt-0.5" />
      <p>{message}</p>
    </div>
  );
};
