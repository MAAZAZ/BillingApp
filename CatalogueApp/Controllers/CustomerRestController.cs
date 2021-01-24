using CatalogueApp.Models;
using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CatalogueApp.Controllers
{   [Route("/api/customers")]
    public class CustomersRestRepository: Controller
    {
        public CatalogueDbRepository catalogueDbRepository { get; set; }
        private string topic = "facture";
        private ProducerConfig _config;

        public CustomersRestRepository(ProducerConfig _config, CatalogueDbRepository repository)
        {
            this._config = _config;
            this.catalogueDbRepository = repository;
        }
        [HttpGet]
        public IEnumerable<Customer> list()
        {
            return catalogueDbRepository.customers;
        }
        [HttpPost]
        public async Task<ActionResult> add([FromBody] Customer customer)
        {
            catalogueDbRepository.customers.Add(customer);
            catalogueDbRepository.SaveChanges();

            string serializedCustomer = JsonConvert.SerializeObject(customer);
            using (var producer = new ProducerBuilder<Null, string>(_config).Build())
            {
                await producer.ProduceAsync(topic, new Message<Null, string> { Value = "Add customer : " + serializedCustomer });
                producer.Flush(TimeSpan.FromSeconds(10));
                return Ok(true);
            }
        }
        [HttpGet("{id}")]
        public Customer find(int id)
        {
            return catalogueDbRepository.customers.FirstOrDefault(s=> s.CustomerId==id);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(int id)
        {
            Customer customer=catalogueDbRepository.customers.Find(id);
            catalogueDbRepository.customers.Remove(customer);
            catalogueDbRepository.SaveChanges();

            string serializedCustomer = JsonConvert.SerializeObject(customer);
            using (var producer = new ProducerBuilder<Null, string>(_config).Build())
            {
                await producer.ProduceAsync(topic, new Message<Null, string> { Value = "Delete customer : " + serializedCustomer });
                producer.Flush(TimeSpan.FromSeconds(10));
                return Ok(true);
            }

        }
        [HttpPut("{id}")]
        public async Task<ActionResult> update(int id, [FromBody] Customer customer)
        {
            string serializedCustomer_before = JsonConvert.SerializeObject(customer);
            customer.CustomerId = id;
            catalogueDbRepository.customers.Update(customer);
            catalogueDbRepository.SaveChanges();

            string serializedCustomer = JsonConvert.SerializeObject(customer);
            using (var producer = new ProducerBuilder<Null, string>(_config).Build())
            {
                await producer.ProduceAsync(topic, new Message<Null, string> { 
                    Value = "Update customer from " + serializedCustomer_before + " to " + serializedCustomer 
                });
                producer.Flush(TimeSpan.FromSeconds(10));
                return Ok(true);
            }
        }

    }
}
