import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

const CREATE_USER = gql`
  mutation CreateUser($first_name: String!, $last_name: String!, $birth_date: String!, $city: City!) {
    createUser(first_name: $first_name, last_name: $last_name, birth_date: $birth_date, city: $city) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $first_name: String!, $last_name: String!, $birth_date: String!, $city: City!) {
    updateUser(id: $id, first_name: $first_name, last_name: $last_name, birth_date: $birth_date, city: $city) {
      id
    }
  }
`;

interface User {
    id?: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    city: string;
}

export function UserForm({
                             refetch,
                             editingUser,
                             setEditingUser
                         }: {
    refetch: () => void;
    editingUser?: User | null;
    setEditingUser?: (user: User | null) => void;
}) {
    const [form, setForm] = useState<User>({
        first_name: '',
        last_name: '',
        birth_date: '',
        city: 'TEL_AVIV',
    });

    const [createUser] = useMutation(CREATE_USER);
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (editingUser) {
            setForm(editingUser);
        }
    }, [editingUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser && editingUser.id) {
            await updateUser({ variables: { ...form, id: editingUser.id } });
            setEditingUser?.(null);
        } else {
            await createUser({ variables: form });
        }
        setForm({ first_name: '', last_name: '', birth_date: '', city: 'TEL_AVIV' });
        refetch();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="First Name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
            <input placeholder="Last Name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
            <input type="datetime-local" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
            <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                <option value="TEL_AVIV">Tel Aviv</option>
                <option value="JERUSALEM">Jerusalem</option>
                <option value="HAIFA">Haifa</option>
            </select>
            <button type="submit" disabled={!form.first_name || !form.last_name || !form.birth_date || !form.city}>{editingUser ? 'Update' : 'Create'}</button>
        </form>
    );
}
