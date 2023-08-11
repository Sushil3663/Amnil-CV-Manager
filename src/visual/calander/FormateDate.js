export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
};

// <ListItemText
// primary={event.title}
// secondary={
//   <Typography>
//     {formatDate(event.start, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })}
//   </Typography>
// }
// />