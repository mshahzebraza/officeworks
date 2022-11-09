import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { moduleClientState, poClientState, mwoClientState } from "../../store/config";

/**
 * Saves the App Data from Server into the Client Store
 */
export const retrieveApp = async () => {
    // Retrieve App State from server //! Not Ideal: Try windowing, use RTK Query, React-Query etc.
    const { success, data, error, message } = await requestAPI({ url: process.env.NEXT_PUBLIC_API_ALL })

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);
    // 2. Client update
    moduleClientState({ list: data.moduleList, fetched: true })
    poClientState({ list: data.poList, fetched: true });
    mwoClientState({ list: data.mwoList, fetched: true });
}
