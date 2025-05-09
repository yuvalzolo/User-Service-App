"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const client_1 = require("@apollo/client");
const apollo_1 = require("./apollo");
const UserList_1 = require("./components/UserList");
const UserForm_1 = require("./components/UserForm");
const client_2 = require("@apollo/client");
const react_1 = require("react");
const GET_USERS = (0, client_2.gql) `
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
function AppContent() {
    const { refetch } = (0, client_2.useQuery)(GET_USERS);
    const [editingUser, setEditingUser] = (0, react_1.useState)(null);
    return (<>
            <h1>User Manager</h1>
            <UserForm_1.UserForm refetch={refetch} editingUser={editingUser} setEditingUser={setEditingUser}/>
            <UserList_1.UserList setEditingUser={setEditingUser}/>
        </>);
}
function App() {
    return (<client_1.ApolloProvider client={apollo_1.client}>
            <div style={{
            display: 'block',
            minHeight: '100vh',
            margin: 0,
            padding: '2rem 2rem 4rem',
            fontFamily: 'sans-serif',
        }}>
                <AppContent />
            </div>
        </client_1.ApolloProvider>);
}
