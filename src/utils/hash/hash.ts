import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
