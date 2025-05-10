import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

export enum City {
    TEL_AVIV = 'TEL_AVIV',
    JERUSALEM = 'JERUSALEM',
    HAIFA = 'HAIFA',
}

registerEnumType(City, {
    name: 'City',
});

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    first_name!: string;

    @Field()
    @Column()
    last_name!: string;

    @Field()
    @Column()
    birth_date!: string;

    @Field(() => City)
    @Column({
        type: 'enum',
        enum: City,
    })
    city!: City;

    @Field()
    @CreateDateColumn()
    created_at!: Date;

    @Field()
    @UpdateDateColumn()
    updated_at!: Date;
}

