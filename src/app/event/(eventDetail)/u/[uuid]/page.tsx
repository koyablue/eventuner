import { AttendancePage } from "@/features/attendance/components/AttendancePage";
import { getEventByUuidService } from "@/features/event/services/getEventByUuidService";

const EventDetail = async ({
  params,
}: {
  params: { uuid: string };
}) => {
  const event = await getEventByUuidService(params.uuid);

  return (
    <AttendancePage event={event} />
  );
};

export default EventDetail;
