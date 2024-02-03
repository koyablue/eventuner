import { EventDetailAndAttendancePage } from "@/features/attendance/components/EventDetailAndAttendancePage";
import { getEventByUuidService } from "@/features/event/services/getEventByUuidService";

const EventDetailAndAttendance = async ({
  params,
}: {
  params: { uuid: string };
}) => {
  const event = await getEventByUuidService(params.uuid);

  return (
    <EventDetailAndAttendancePage event={event} />
  );
};

export default EventDetailAndAttendance;
