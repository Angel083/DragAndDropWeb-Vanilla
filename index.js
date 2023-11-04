// Se obtienen las referencias de los items a mover y los que pueden aceptar a los primeros items
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
});

containers.forEach(container => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    // Obtener la referencia del objeto que se le esta haciendo dragging
    console.log("afterElement")
    console.log(afterElement)
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
});

// Selecciona todos los elementos draggable a excepción del 
// que se le esta haciendo dragging
/** Esto se debe a que el elemento al que se le esta haciendo dragging,
 * tiene que estar debajo de los otros draggable pero no debajo de si mismo
 * Nota: personalmente no veo cual sea el problema al acabar el tuto haré pruebas
 */
// function getDragAfterElement(container, y){
//   const draggableElements =  [...container.querySelectorAll('.draggable:not(.dragging)')]
//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     console.log(offset)
//     if (offset < 0 && offset > closest.offset) {
//       return {offset: offset, element : child}
//     }
//     else {
//       return closest
//     }
//   }, {offset : Number.POSITIVE_INFINITY}).element
// }  

function getDragAfterElement(container, y){
  const draggableElements =  [...container.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    console.log(closest)
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    console.log(offset)
    console.log(closest.offset)
    if (offset < 0 && offset < closest.offset) {
      return {offset: offset, element : child}
    }
    else {
      return closest
    }
  // }, {offset : Number.NEGATIVE_INFINITY}).element
  }, {offset : Number.POSITIVE_INFINITY}).element
}
