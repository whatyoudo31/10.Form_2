export function formatCommentDate(dateStamp) {
    let dateContent;
    switch (true) {
        // ----------больше 1 минуты назад----------
        case Date.now() - 60000 >= dateStamp && dateStamp > Date.now() - 300000:
            dateContent = "1 минуту назад";

            break;
        // ----------больше 5 минут назад----------
        case Date.now() - 300000 >= dateStamp &&
            dateStamp > Date.now() - 600000:
            dateContent = "5 минут назад";

            break;
        // ----------больше 10 минут назад----------
        case Date.now() - 600000 >= dateStamp &&
            dateStamp > Date.now() - 1800000:
            dateContent = "10 минут назад";

            break;
        // ----------больше 30 минут назад----------
        case Date.now() - 1800000 >= dateStamp &&
            dateStamp > Date.now() - 3600000:
            dateContent = "30 минут назад";

            break;
        // ---------- больше 1 часа назад----------
        case Date.now() - 3600000 >= dateStamp &&
            dateStamp > Date.now() - 86400000:
            {
                const hoursNow = new Date(Date.now()).getHours();
                const minutesNow = new Date(Date.now()).getMinutes();

                const hourseComment = new Date(dateStamp).getHours();
                const minutesComment = new Date(dateStamp).getMinutes();
                dateContent = `${hoursNow - hourseComment} ч ${
                    minutesNow - minutesComment
                } мин назад`;
            }
            break;
        // ---------- больше 1 дня назад----------
        case Date.now() - 86400000 >= dateStamp &&
            dateStamp > Date.now() - 31536000000:
            {
                const dayComment = new Date(dateStamp).getDate();
                const monthComment = new Date(dateStamp).getMonth();
                dateContent = `${dayComment}.${
                    monthComment > 9 ? monthComment : "0" + monthComment
                }`;
            }
            break;
        // ---------- больше 1 года назад----------
        case Date.now() - 31536000000 >= dateStamp:
            {
                const dayComment = new Date(dateStamp).getDate();
                const monthComment = new Date(dateStamp).getMonth();
                const yearComment = new Date(dateStamp).getFullYear();
                dateContent = `${dayComment}.${monthComment}.${yearComment}`;
            }
            break;
        default:
            dateContent = "только что...";

            break;
    }
    return dateContent;
}
