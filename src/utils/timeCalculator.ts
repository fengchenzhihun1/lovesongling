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

  // 创建日期副本避免修改原始日期
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let years = 0;
  let months = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // 计算年份
  years = end.getFullYear() - start.getFullYear();
  
  // 计算月份
  months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // 计算天数
  days = end.getDate() - start.getDate();
  if (days < 0) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
    // 获取上个月的最后一天
    const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  
  // 计算小时
  hours = end.getHours() - start.getHours();
  if (hours < 0) {
    days--;
    hours += 24;
    // 如果天数变为负数，需要重新调整
    if (days < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
      const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += lastDayOfPrevMonth;
    }
  }
  
  // 计算分钟
  minutes = end.getMinutes() - start.getMinutes();
  if (minutes < 0) {
    hours--;
    minutes += 60;
    if (hours < 0) {
      days--;
      hours += 24;
      if (days < 0) {
        months--;
        if (months < 0) {
          years--;
          months += 12;
        }
        const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
      }
    }
  }
  
  // 计算秒数
  seconds = end.getSeconds() - start.getSeconds();
  if (seconds < 0) {
    minutes--;
    seconds += 60;
    if (minutes < 0) {
      hours--;
      minutes += 60;
      if (hours < 0) {
        days--;
        hours += 24;
        if (days < 0) {
          months--;
          if (months < 0) {
            years--;
            months += 12;
          }
          const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
          days += lastDayOfPrevMonth;
        }
      }
    }
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