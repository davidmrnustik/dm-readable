import randtoken from 'rand-token';

randtoken.generator({
  chars: 'a-z'
});

export const getIDToken = () => {
  return randtoken.generate(21).toLowerCase();
}