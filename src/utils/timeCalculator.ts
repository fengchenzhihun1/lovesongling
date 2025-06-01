// 统一的时间计算工具函数

/**
 * 计算两个日期之间的精确时间差
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 包含年、月、日、时、分、秒的对象
 */
export function calculateTimeDifference(startDate: Date, endDate: Date) {
  if (endDate < startDate) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();
  let minutes = endDate.getMinutes() - startDate.getMinutes();
  let seconds = endDate.getSeconds() - startDate.getSeconds();

  // 处理秒数借位
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  // 处理分钟借位
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // 处理小时借位
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // 处理天数借位
  if (days < 0) {
    // 获取上个月的天数
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  // 处理月份借位
  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds)
  };
}

/**
 * 计算总天数（用于兼容现有代码）
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 总天数
 */
export function calculateTotalDays(startDate: Date, endDate: Date): number {
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}