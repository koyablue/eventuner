import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icnos";
import { attendanceStatus, AttendanceStatusType } from "@/constants/attendance";

const AttendeeBadge = ({
  status,
  label,
}: {
  status: AttendanceStatusType
  label: string
}) => {
  const iconProps = {
    [attendanceStatus.attending]: { component: Icons.checkCircle, color: "text-emerald-500" },
    [attendanceStatus.notAttending]: { component: Icons.xCircle, color: "text-red-400" },
    [attendanceStatus.notSure]: { component: Icons.checkCircle, color: "text-orange-300" },
  };

  const IconComponent = iconProps[status].component;
  const iconColor = iconProps[status].color;

  return (
    <Badge variant="outline" className="max-w-44 px-1.5 py-1 flex justify-start gap-1 truncate">
      <div className="flex-shrink-0 w-6 h-6">
        <IconComponent className={`w-full h-full ${iconColor}`} />
      </div>
      <p className="truncate">{label}</p>
    </Badge>
  );
};

const EventDetail = () => {
  return (
    <div>
      <header className="pt-16 pb-8">
        <h1 className="text-3xl font-semibold truncate">Random event name here</h1>
      </header>
      <div>
        <form>
          <div className="py-8">
            <Label>Your name</Label>
            <Input className="focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>

          {/* TODO: Make it Accordion */}
          {/* day section */}
          <div className="flex flex-col gap-4 py-8 border-b">
            <div>
              <p className="text-xl font-bold">
                Fri, 1st, Apr, 2024
              </p>
            </div>

            {/* time range section */}
            <div className="w-full flex flex-col gap-4 mb-8">
              <div>
                <p className="font-semibold">
                  09:30 am - 11:30 am
                </p>
              </div>

              <div>
                <RadioGroup defaultValue="3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="radio-attending" />
                    <Label htmlFor="radio-attending" className="cursor-pointer">Attending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="radio-maybe" />
                    <Label htmlFor="radio-maybe" className="cursor-pointer">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="radio-not-attending" />
                    <Label htmlFor="radio-not-attending" className="cursor-pointer">Not attending</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <p className="text-muted-foreground">5 yes, 1 maybe, 1 declined</p>
              </div>

              <div className="w-full flex flex-wrap gap-2">
                <AttendeeBadge label="Alexander McQueen" status={1} />
                <AttendeeBadge label="John Smith" status={1} />
                <AttendeeBadge label="Tyler Durden" status={1} />
                <AttendeeBadge label="Craig Owens" status={1} />
                <AttendeeBadge label="Cory Taylor" status={1} />
                <AttendeeBadge label="Soshina" status={2} />
                <AttendeeBadge label="Ano-chan" status={3} />
                <AttendeeBadge label="Seiya" status={1} />
              </div>
            </div>

            {/* time range section */}
            <div className="w-full flex flex-col gap-4">
              <div>
                <p className="font-semibold">
                  12:30 pm - 01:30 pm
                </p>
              </div>

              <div>
                <RadioGroup defaultValue="3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="radio-attending" />
                    <Label htmlFor="radio-attending" className="cursor-pointer">Attending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="radio-maybe" />
                    <Label htmlFor="radio-maybe" className="cursor-pointer">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="radio-not-attending" />
                    <Label htmlFor="radio-not-attending" className="cursor-pointer">Not attending</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <p className="text-muted-foreground">5 yes, 1 maybe, 1 declined</p>
              </div>

              <div className="w-full flex flex-wrap gap-2">
                <AttendeeBadge label="Alexander McQueen" status={1} />
                <AttendeeBadge label="John Smith" status={1} />
                <AttendeeBadge label="Tyler Durden" status={1} />
                <AttendeeBadge label="Craig Owens" status={1} />
                <AttendeeBadge label="Cory Taylor" status={1} />
                <AttendeeBadge label="Soshina" status={2} />
                <AttendeeBadge label="Ano-chan" status={3} />
                <AttendeeBadge label="Seiya" status={1} />
              </div>
            </div>

          </div>

          {/* day section */}
          <div className="flex flex-col gap-4 py-8 border-b">
            <div>
              <p className="text-xl font-bold">
                Sat, 2nd, Apr, 2024
              </p>
            </div>

            {/* time range section */}
            <div className="w-full flex flex-col gap-4 mb-8">
              <div>
                <p className="font-semibold">
                  09:30 am - 11:30 am
                </p>
              </div>

              <div>
                <RadioGroup defaultValue="3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="radio-attending" />
                    <Label htmlFor="radio-attending" className="cursor-pointer">Attending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="radio-maybe" />
                    <Label htmlFor="radio-maybe" className="cursor-pointer">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="radio-not-attending" />
                    <Label htmlFor="radio-not-attending" className="cursor-pointer">Not attending</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <p className="text-muted-foreground">5 yes, 1 maybe, 1 declined</p>
              </div>

              <div className="w-full flex flex-wrap gap-2">
                <AttendeeBadge label="Alexander McQueen" status={1} />
                <AttendeeBadge label="John Smith" status={1} />
                <AttendeeBadge label="Tyler Durden" status={1} />
                <AttendeeBadge label="Craig Owens" status={1} />
                <AttendeeBadge label="Cory Taylor" status={1} />
                <AttendeeBadge label="Soshina" status={2} />
                <AttendeeBadge label="Ano-chan" status={3} />
                <AttendeeBadge label="Seiya" status={1} />
              </div>
            </div>

            {/* time range section */}
            <div className="w-full flex flex-col gap-4">
              <div>
                <p className="font-semibold">
                  12:30 pm - 01:30 pm
                </p>
              </div>

              <div>
                <RadioGroup defaultValue="3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="radio-attending" />
                    <Label htmlFor="radio-attending" className="cursor-pointer">Attending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="radio-maybe" />
                    <Label htmlFor="radio-maybe" className="cursor-pointer">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="radio-not-attending" />
                    <Label htmlFor="radio-not-attending" className="cursor-pointer">Not attending</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <p className="text-muted-foreground">5 yes, 1 maybe, 1 declined</p>
              </div>

              <div className="w-full flex flex-wrap gap-2">
                <AttendeeBadge label="Alexander McQueen" status={1} />
                <AttendeeBadge label="John Smith" status={1} />
                <AttendeeBadge label="Tyler Durden" status={1} />
                <AttendeeBadge label="Craig Owens" status={1} />
                <AttendeeBadge label="Cory Taylor" status={1} />
                <AttendeeBadge label="Soshina" status={2} />
                <AttendeeBadge label="Ano-chan" status={3} />
                <AttendeeBadge label="Seiya" status={1} />
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EventDetail;
