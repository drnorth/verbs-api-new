import mockTests from "../mock/tests";

const COUNT = 5;

const createLesson = (arr: string[]) => {
  const excess: number = arr.length % COUNT;
  const items: string[] = arr.slice(0, -excess);
  const excessItems: string[] = arr.slice(-excess);
  const countElements: number = items.length / COUNT;
  const testItems = Array.from({ length: countElements }).reduce(
    (acc: Record<string, string[]>, _, index) => {
      const end = (index + 1) * COUNT;
      const start = end - COUNT;

      return {
        ...acc,
        [index]: items.slice(start, end),
      };
    },
    {} as Record<string, string[]>
  );

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  Array.from({ length: countElements }).forEach((_, i) => {
    const currIndex = getRandomInt(i, countElements - 1);
    const currElement: string | undefined = excessItems.pop();

    if (currElement) {
      testItems[currIndex].push(currElement);
    }
  });

  return testItems;
};

export const generateLessons = () => {
  const keys = Object.keys(mockTests);

  return keys.map((key) => createLesson(mockTests[key]));
};
