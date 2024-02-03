import { Icons } from "@/components/icnos";
import { ReloadButton } from "./ReloadButton";

type Props = {
  reloadAction: () => void
};

export const AttendanceRegistered = ({ reloadAction }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4 sm:pb-4">
        <Icons.checkCircle className="w-7 h-7 text-emerald-500 sm:w-10 sm:h-10" />
        <h1 className="text-center text-xl font-semibold whitespace-nowrap sm:text-3xl">
          Your attendance has been registered.
        </h1>
      </div>

      <div className="flex flex-col text-sm text-muted-foreground sm:items-center sm:text-md lg:flex-row lg:text-lg">
        <p>See you at the event!&nbsp;</p>
      </div>

      <div className="w-full sm:w-2/3">
        <div className="flex flex-col space-y-4">
          <div className="relative w-full">
          </div>
        </div>
      </div>
      <ReloadButton onClickHandler={reloadAction}>
        Back to event page
      </ReloadButton>
    </div>
  );
};