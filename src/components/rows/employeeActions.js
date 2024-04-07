// Define your action type constant
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';

// Define your action creator function
export const removeEmployee = (employeeId) => {
    return {
        type: REMOVE_EMPLOYEE,
        payload: employeeId
    };
};