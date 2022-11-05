import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { moduleClientState, poClientState, mwoClientState } from "../../store/config";

/**
 * Saves the App Data from Server into the Client Store
 */
export const retrieveApp = async () => {
    // Retrieve App State from server //! Not Ideal: Try windowing, use RTK Query, React-Query etc.
    const { success, data, error, message } = await requestAPI({ url: 'http://localhost:3000/api/all' })
    if (!success) throw new Error('Error:', error || message)

    // 2. Client update
    moduleClientState({ list: data.moduleList, fetched: true })
    poClientState({ list: data.poList, fetched: true });
    mwoClientState({ list: data.mwoList, fetched: true });
}