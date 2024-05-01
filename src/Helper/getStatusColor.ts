import { SD_Status } from "../Utility/SD";

const  getStatusColor = (status: SD_Status) => {
  let color: string = "";
  switch (status) {
    case SD_Status.CONFIRMED:
      color = "primary";
      break;
    case SD_Status.PENDING:
      color = "secondary";
      break;
    case SD_Status.CANCELLED:
      color = "danger";
      break;
    case SD_Status.COMPLETED:
      color = "success";
      break;
    case SD_Status.BEING_COOKED:
      color = "info";
      break;
    case SD_Status.READY_FOR_PICKUP:
      color = "warning";
      break;
    default:
        color = "";
      break;
  }
  return color;
};

export default getStatusColor;
