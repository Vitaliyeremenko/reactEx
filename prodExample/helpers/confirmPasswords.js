const confirmPasswords = (first, second) => {
  if (first !== second) {
    return false;
  }

  return true;
}

export {
  confirmPasswords
}