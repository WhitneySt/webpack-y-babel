const printTransactions = (container, transactionList) => {
  container.innerHTML = "";
  transactionList.forEach((element) => {
    container.innerHTML += `
        <article class="transactionCard">
            <span class="number">${element.id}</span>
            <p>${element.descripcion}</p>
            <span class="price">$ ${element.valor.toLocaleString()}</span>
            <span class="type">${element.tipo}</span>
            <div class="actions">
                <button class="delete" id=delete${element.id} name=${
      element.id
    }>Eliminar</button>
                <button class="edit" id=edit${element.id} name=${
      element.id
    }>Editar</button>
            </div>
        </article>
        `;
  });
};

export default printTransactions;
