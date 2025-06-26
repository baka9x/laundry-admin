export function getGreeting() {
    const currentDatetime = new Date();
    const currentHour = currentDatetime.getHours();
  
    if (currentHour >= 0 && currentHour <= 3) {
      return {
        greetingText: `Chào buổi khuya (✦థ ｪ థ),`,
        greetingClass: 'text-blue-400',
      };
    } else if (currentHour > 3 && currentHour <= 9) {
      return {
        greetingText: `Chào buổi sáng ༼ ༎ຶ ᆺ ༎ຶ༽,`,
        greetingClass: 'text-white',
      };
    } else if (currentHour > 9 && currentHour <= 13) {
      return {
        greetingText: `Chào buổi trưa ᕙ(⇀‸↼‶)ᕗ,`,
        greetingClass: 'text-yellow-500',
      };
    } else if (currentHour > 13 && currentHour <= 18) {
      return {
        greetingText: `Chào buổi chiều ( ˘▽˘)っ♨,`,
        greetingClass: 'text-orange-500',
      };
    } else {
      return {
        greetingText: `Chào buổi tối ( ๑‾̀◡‾́)σ",`,
        greetingClass: 'text-gray-500',
      };
    }
  }