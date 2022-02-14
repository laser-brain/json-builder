export default function useInputHistory() {
  const history: string[] = [];

  const updateHistory = (checkValue: string): boolean => {
    const prevState = history.at(-1);
    const result = prevState !== checkValue;

    if (result) {
      history.push(checkValue);
    }
    return result;
  };

  return { updateHistory };
}
