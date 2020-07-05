import {useAuth} from '../customeHooks/customeHooks';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;