import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { User, City } from '../entities/User';
import { AppDataSource } from '../index';

@Resolver(User)
export class UserResolver {
    private userRepo = AppDataSource.getRepository(User);

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await this.userRepo.find();
    }

    @Mutation(() => User)
    async createUser(
        @Arg('first_name') first_name: string,
        @Arg('last_name') last_name: string,
        @Arg('birth_date') birth_date: string,
        @Arg('city', () => City) city: City
    ): Promise<User> {
        const user = this.userRepo.create({ first_name, last_name, birth_date, city });
        return await this.userRepo.save(user);
    }

    @Mutation(() => User)
    async updateUser(
        @Arg('id', () => ID) id: number,
        @Arg('first_name') first_name: string,
        @Arg('last_name') last_name: string,
        @Arg('birth_date') birth_date: string,
        @Arg('city', () => City) city: City
    ): Promise<User> {
        const user = await this.userRepo.findOneByOrFail({ id });
        user.first_name = first_name;
        user.last_name = last_name;
        user.birth_date = birth_date;
        user.city = city;
        return await this.userRepo.save(user);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id', () => ID) id: number): Promise<boolean> {
        await this.userRepo.delete(id);
        return true;
    }
}
