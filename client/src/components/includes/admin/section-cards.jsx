import { TrendingDownIcon, TrendingUpIcon, Users, BedDouble, CreditCard, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    (<div
      className="*:data-[slot=card]:shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            $45,230.89
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +20.1%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <CreditCard className="size-4" />
            Up from last month
          </div>
          <div className="text-muted-foreground">
            Hotel revenue for this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Guests</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            156
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <Users className="size-4" />
            Currently checked in
          </div>
          <div className="text-muted-foreground">
            Guest occupancy rate: 78%
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Available Rooms</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            44
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -22%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <BedDouble className="size-4" />
            Ready for booking
          </div>
          <div className="text-muted-foreground">Out of 200 total rooms</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Today's Bookings</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            23
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +15%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <Calendar className="size-4" />
            New reservations today
          </div>
          <div className="text-muted-foreground">Above daily average</div>
        </CardFooter>
      </Card>
    </div>)
  );
}
