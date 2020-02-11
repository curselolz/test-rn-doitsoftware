const validationField = arrOfvalue => {
  if (arrOfvalue.some(el => el.value === '')) {
    return true;
  }
  return arrOfvalue.some(el => el.value[0] === el.value[0].toUpperCase());

};

export default validationField;
