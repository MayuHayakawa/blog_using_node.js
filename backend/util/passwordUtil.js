import bcrypt from "bcrypt";

async function hashPassword(password) {
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    return hashed;
}

async function comparePassword(password, hashedPassword) {
    console.log(password);
    console.log(hashedPassword);
    const match = await bcrypt.compare(password, hashedPassword);
    console.log(match);
    return match;
}

export { hashPassword, comparePassword }