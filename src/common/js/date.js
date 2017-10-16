/**
 * Created by Administrator on 2017/10/15.
 */
export function formatDate(date){
  try {
    var newDate = new Date(date);
    var month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
    var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    var hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
    var minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
    var seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
    var stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
  }catch(e){
    var stringDate = "0000-00-00 00:00:00";
  }finally{
    return stringDate;
  }
}
