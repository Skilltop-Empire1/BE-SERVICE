const {Service , Inventory , Organization} = require('../models');
const { serviceSchema } = require('../validation/serviceValidation');
const { Op } = require("sequelize"); 






// Create a new service
exports.createService = async(req,res) => {

    try {
    const { error } = serviceSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    const{serviceName,price,duration,serviceManager,phoneNumber,description}=req.body;
    const service = await Service.create({
        serviceName,
        price,
        duration,
        serviceManager,
        phoneNumber,
        description,
    });
    res.status(201).json(service);
} catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Update service
exports.updateService = async (req, res) => {
    try {
      const { serviceId } = req.params;
      const {serviceName,price,duration,serviceManager,phoneNumber,description,} = req.body;
  
      const { error } = serviceSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Find the service by ID
      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      await service.update({
        serviceName: serviceName || service.serviceName,
        price: price || service.price,
        duration: duration || service.duration,
        serviceManager: serviceManager || service.serviceManager,
        phoneNumber: phoneNumber || service.phoneNumber,
        description: description || service.description,
      });
  
      res.status(200).json({
        message: "Service updated successfully",
        service,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// View Service
  exports.viewService = async(req,res) => {
    try {
        const { serviceId } = req.params;
        
        const service = await Service.findByPk(serviceId);
        if (!service) {
          return res.status(404).json({ message: "Service not found" });
        }
       const response = {
        serviceName : service.serviceName ,
        price : service.price ,
        duration : service.duration,
        serviceManager : service.serviceManager,
        phoneNumber : service.phoneNumber,
        description : service.description
      };
      return res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



//Delete Service
exports.deleteService = async(req,res) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findByPk(serviceId);
        if (!service) {
          return res.status(404).json({ message: "Service not found" });
        }
        await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };


//Get all Services
 exports.getAllServices = async (req, res) => {
        try {
          // Extract pagination parameters from the query string
          const page = parseInt(req.query.page) || 1; 
          const limit = parseInt(req.query.limit) || 5; 
          const offset = (page - 1) * limit;
          const totalServices = await Service.count();
          const serviceData = await Service.findAll({
            attributes: [
              "serviceId",
              "serviceName",
              "price",
              "duration",
              "serviceManager",
              "phoneNumber",
              "description",
              "createdAt",
            ],
            limit: limit,
            offset: offset,
            order: [["serviceId", "ASC"]],
          });
      
       
          const formattedServiceData = serviceData.map((service) => ({
            serviceId: service.serviceId,
            serviceName: service.serviceName,
            price: service.price,
            duration: service.duration,
            serviceManager: service.serviceManager,
            phoneNumber: service.phoneNumber,
            description: service.description,
            addedDate: service.createdAt,
          }));
      
          const totalPages = Math.ceil(totalServices / limit);
          const hasNextPage = page < totalPages;
          const hasPrevPage = page > 1;
      
          const response = {
            currentPage: page,
            totalPages,
            limit,
            totalServices,
            hasNextPage,
            hasPrevPage,
            services: formattedServiceData,
            nextPage: hasNextPage
              ? `/api/IMS/all-services?page=${page + 1}&limit=${limit}`
              : null,
            prevPage: hasPrevPage
              ? `/api/IMS/all-services?page=${page - 1}&limit=${limit}`
              : null,
          };
      
          res.json(response);
        } catch (error) {
          console.error("Error fetching paginated service data:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      };