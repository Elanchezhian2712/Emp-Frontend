import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addTeam } from "../../http";

const AddTeam = () => {
    const initialState = { name: '', description: '' };
    const [formData, setFormData] = useState(initialState);

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData((old) => ({
            ...old,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const { name, description } = formData;
        if (!name || !description) return toast.error('All Field Required');

        const fd = new FormData();
        Object.keys(formData).forEach((key) => {
            fd.append(key, formData[key]);
        });
        const res = await addTeam(fd);
        if (res.success) {
            setFormData({ ...initialState });
            toast.success(res.message);
        }
    };

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <HeaderSection title='Add Team' />
                    <div className="card">
                        <div className="card-body pr-5 pl-5 m-1">
                            <form className='row' onSubmit={onSubmit}>
                                <div className="form-group col-md-12">
                                    <label>Enter Team Name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-user"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.name} type="text" id='name' name='name' className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group col-md-12 ">
                                    <label>Enter Team Description</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-file-alt"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.description} type="text" id='description' name='description' className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group text-center col-md-12">
                                    <button className='btn btn-primary btn-lg' type='submit' style={{ width: '30vh' }}>Add Team</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AddTeam;
