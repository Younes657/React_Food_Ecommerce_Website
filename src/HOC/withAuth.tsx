const withAuth = (WrappedComponent : any) =>{
    return(props : any)=>{

        const accessToken = localStorage.getItem('Token');
        if(accessToken){
            return <WrappedComponent {...props}></WrappedComponent>
        }
        else{
            window.location.replace('/Login')
            return null;
        }
    }
}
export default withAuth