import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { handleSubmit } from './js/formHandler'

const btnInput = document.getElementById('btnSubmit');

btnInput.addEventListener("click", async () => {
    handleSubmit()
})