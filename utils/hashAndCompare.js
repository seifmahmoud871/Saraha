import bcrypt from 'bcryptjs'

export const hash = ({plaintext="",saltRound=process.env.SALT_ROUND}={})=>{
     const hashValue=bcrypt.hashSync(plaintext,parseInt(saltRound));
     return hashValue;
}
export const compare = ({plaintext,hashValue}={})=>{
    const match=bcrypt.compareSync(plaintext,hashValue);
    return match;
}