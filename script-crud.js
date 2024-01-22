const botaoAddTarefa = document.querySelector('.app__button--add-task')
const formAddTarefa = document.querySelector('.app__form-add-task')

botaoAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})