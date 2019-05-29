export function compareUsers (first, second){

  if(!first || !second) return first === second;
  else return first.username === second.username;
}