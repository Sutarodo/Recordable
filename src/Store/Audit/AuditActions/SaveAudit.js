import * as AuditActionTypes from "../AuditActionTypes";
import { GetActiveRecording } from "../../../Storage/RecordingStorage";
import { AddAudit } from "../../../Storage/AuditStorage";
import AssociateAudit from "../../Recording/RecordingActions/AssociateAudit"

const completed = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_COMPLETE,
    payload: { audit }
})

const failed = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_FAILED,
    payload: { audit }
})

export default (task, fieldName, newValue) => dispatch => {
    try {

        const savedAudit = AddAudit(task.id, fieldName, task[fieldName], newValue);
        const activeRecording = GetActiveRecording();

        if (activeRecording != null) {
            dispatch(AssociateAudit(activeRecording.id, savedAudit.id))
        }

        dispatch(completed(savedAudit))

    } catch (error) {

        dispatch(failed(task))

    }
}