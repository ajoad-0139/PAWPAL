import bcrypt from 'bcrypt'
import config from 'config'

const saltValue = 10

export const passwordHashing = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltValue)
    return hashedPassword
}