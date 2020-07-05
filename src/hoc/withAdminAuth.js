import { useAdminAuth } from './../customeHooks/customeHooks';

const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;