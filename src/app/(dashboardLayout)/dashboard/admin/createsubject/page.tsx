import CreateSubject from "@/components/Admin/CreateSubject/CreateSubject";


export const metadata = {
    title: 'Admin | Create Subject',
    description: 'Page to create a new subject in the system',
};

const AdminCreateSubject = () => {
    return (
        <div>
           <CreateSubject/>
        </div>
    );
};

export default AdminCreateSubject;
