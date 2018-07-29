const parseTaskStatus = (status) => {
  switch (status) {
    case 'saved':
      return {
        message: 'Ваше задание сохранено.',
      };
    case 'approved':
      return {
        message: 'Ваше задание активно.',
      };
    case 'rejected':
      return {
        message: 'Ваше задание отклонено модератором.',
      };
    case 'reviewing':
      return {
        message: 'Ваше задание неактивно и сначала должно пройти проверку со стороны модераторов (до 2-х часов в рабочее время)',
      };
    case 'close':
      return {
        message: 'Ваше задание недоступно.',
      };
    default:
      return undefined;
  }
};

const parseDealStatus = (status) => {
  switch (status) {
    case 'request':
      return {
        message: 'Обсуждение',
      };
    case 'working':
      return {
        message: 'В работе',
      };
    case 'checking':
      return {
        message: 'На проверке',
      };
    case 'complete': {
      return {
        message: 'Завершена',
      };
    }
    case 'canceled':
      return {
        message: 'Отменена',
      };
    case 'conflict':
      return {
        message: 'Конфликт',
      };
    default:
      return undefined;
  }
};

export {
  parseTaskStatus,
  parseDealStatus,
};
