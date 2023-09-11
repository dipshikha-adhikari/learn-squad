import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import {  eachDayOfInterval } from "date-fns";
import { useEffect, useState } from "react";
import { IListing} from "../../types";

interface CalendarProps {
  setDate: (props: any) => void;
  setReservationDate: (props: any) => void;
  date: DateRange;
  item: IListing | undefined;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

const Calendar = ({ setDate,setReservationDate, date, item }: CalendarProps) => {
  const [disabled, setDisabled] = useState<any>();
  const handleOnChange = (ranges: any) => {
    const { selection } = ranges;
    setDate(selection);
    setReservationDate(selection)
  };



  useEffect(() => {
    const disableDates = () => {
      let dates: any = [];
item !== undefined &&  item.reservations.length !== 0 &&  item.reservations.map((r: any) => {
        let startDate = r.startDate;
        let endDate = r.endDate;

     if(startDate !== undefined && endDate !== undefined){
      const range = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });
      dates = [...dates, ...range];
     }
      });
      setDisabled(dates);
    };
    disableDates();
  }, [item]);

  return (
    <DateRangePicker
      onChange={handleOnChange}
      ranges={[date]}
      staticRanges={[]}
      moveRangeOnFirstSelection={false}
      inputRanges={[]}
      editableDateInputs={true}
      className="flex flex-col  "
      disabledDates={disabled}
    />
  );
};

export default Calendar;
