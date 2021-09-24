import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export {
    handleSubmit
}

const btnInput = document.getElementById('btnSubmit');

btnInput.addEventListener("click", async () => {
    handleSubmit()
})