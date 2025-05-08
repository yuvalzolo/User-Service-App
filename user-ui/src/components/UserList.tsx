import { gql, useQuery, useMutation } from '@apollo/client';
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      first_name
      last_name
      birth_date
      city
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export function UserList({ setEditingUser }: { setEditingUser: (user: any) => void }) {
    const { data, loading, refetch } = useQuery(GET_USERS);
    const [deleteUser] = useMutation(DELETE_USER);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {data.getUsers.map((user: any) => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name} ({user.city}) — {user.birth_date}
                        <button onClick={() => setEditingUser(user)}>✏️ Edit</button>
                        <button onClick={async () => {
                            await deleteUser({ variables: { id: user.id } });
                            refetch();
                        }}>🗑️ Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
