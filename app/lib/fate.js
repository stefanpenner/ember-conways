export const LIVE = 'LIVE';
export const DIE  = 'DIE';

export default function fate(count) {
  if (count === 3 ) { return LIVE; }
  if (count === 4 ) { return LIVE; } // do nothing

  return DIE;
}
